# ListView Advanced Features (Vue 3)

## Table of Contents
- [Grouping and Sorting](#grouping-and-sorting)
- [Nested Lists with Hierarchy](#nested-lists-with-hierarchy)
- [Checkbox State Management](#checkbox-state-management)
- [Animations and Effects](#animations-and-effects)
- [Custom Icons and Image Display](#custom-icons-and-image-display)
- [Enable/Disable Item States](#enabledisable-item-states)

## Grouping and Sorting

### Grouping Items

```vue
<template>
  <ListViewComponent
    :dataSource="data"
    :fields="fields"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const data = ref([
  { id: '1', text: 'Apple', category: 'Fruit' },
  { id: '2', text: 'Banana', category: 'Fruit' },
  { id: '3', text: 'Carrot', category: 'Vegetable' },
  { id: '4', text: 'Spinach', category: 'Vegetable' }
]);

const fields = {
  id: 'id',
  text: 'text',
  groupBy: 'category'
};
</script>
```

### Sort Order

```vue
<template>
  <ListViewComponent
    :dataSource="data"
    :fields="fields"
    sortOrder="Ascending"
  />
</template>
```

Available sort orders:
- `'None'`
- `'Ascending'`
- `'Descending'`

### Manual Grouping

```vue
<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { id: '1', text: 'Apple', category: 'Fruit' },
  { id: '2', text: 'Carrot', category: 'Vegetable' }
]);

const grouped = computed(() => {
  const groups = {};
  items.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });
  return Object.entries(groups).map(([category, items]) => ({
    category,
    items
  }));
});

const fields = {
  id: 'id',
  text: 'text',
  child: 'items',
  groupBy: 'category'
};
</script>

<template>
  <ListViewComponent :dataSource="grouped" :fields="fields" />
</template>
```

## Nested Lists with Hierarchy

### Three-Level Hierarchy

```vue
<template>
  <ListViewComponent :dataSource="hierarchy" :fields="fields" />
</template>

<script setup>
const hierarchy = [
  {
    id: '1',
    text: 'Documents',
    child: [
      {
        id: '1.1',
        text: 'Work',
        child: [
          { id: '1.1.1', text: 'Reports' },
          { id: '1.1.2', text: 'Presentations' }
        ]
      },
      { id: '1.2', text: 'Personal' }
    ]
  }
];

const fields = {
  id: 'id',
  text: 'text',
  child: 'child'
};
</script>
```

## Checkbox State Management

### Track Checkbox Changes

```vue
<template>
  <div>
    <p>Selected: {{ selectedIds.length }} items</p>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      :showCheckBox="true"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', text: 'Item 1', isChecked: false },
  { id: '2', text: 'Item 2', isChecked: false }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };

const selectedIds = ref([]);

const onChange = () => {
  selectedIds.value = items.value.filter(i => i.isChecked).map(i => i.id);
};
</script>
```

### Select All / Clear All

```vue
<template>
  <div>
    <div class="toolbar">
      <button @click="selectAll">Select All</button>
      <button @click="clearAll">Clear All</button>
    </div>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      :showCheckBox="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: '1', text: 'A', isChecked: false },
  { id: '2', text: 'B', isChecked: false }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };

const selectAll = () => {
  items.value = items.value.map(i => ({ ...i, isChecked: true }));
};

const clearAll = () => {
  items.value = items.value.map(i => ({ ...i, isChecked: false }));
};
</script>
```

## Animations and Effects

### Default Animations

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
  />
</template>

<style>
/* Default animation on add */
.e-list-item.e-added {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
```

### Hover Effects

```vue
<style>
.e-list-item {
  transition: background 0.2s, transform 0.2s;
}

.e-list-item:hover {
  background: #f5f5f5;
  transform: translateX(4px);
}
</style>
```

## Custom Icons and Image Display

### Custom Icons via CSS Class

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :showIcon="true"
  />
</template>

<script setup>
const items = ref([
  { id: '1', text: 'Inbox', icon: 'e-icons e-inbox' },
  { id: '2', text: 'Sent', icon: 'e-icons e-send' },
  { id: '3', text: 'Trash', icon: 'e-icons e-trash' }
]);

const fields = { id: 'id', text: 'text', iconCss: 'icon' };
</script>
```

### Image Display

```vue
<template>
  <ListViewComponent
    :dataSource="contacts"
    :fields="fields"
    :showImage="true"
  />
</template>

<script setup>
const contacts = ref([
  { id: '1', name: 'Alice', avatar: 'alice.jpg' },
  { id: '2', name: 'Bob', avatar: 'bob.jpg' }
]);

const fields = { id: 'id', text: 'name', image: 'avatar' };
</script>
```

### Custom Image Templates

```vue
<script setup>
const imageTemplate = (data) => {
  return `<div class="user-item">
    <img src="${data.avatar}" alt="${data.name}" class="avatar" />
    <div class="user-info">
      <div class="user-name">${data.name}</div>
      <div class="user-status ${data.online ? 'online' : 'offline'}">
        ${data.online ? 'Online' : 'Offline'}
      </div>
    </div>
  </div>`;
};
</script>

<template>
  <ListViewComponent
    :dataSource="contacts"
    :fields="fields"
    :template="imageTemplate"
  />
</template>

<style>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
.user-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}
.user-status.online { color: #4caf50; }
.user-status.offline { color: #999; }
</style>
```

## Enable/Disable Item States

### Disable Specific Items

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
  />
</template>

<script setup>
const items = ref([
  { id: '1', text: 'Active Item', isEnabled: true },
  { id: '2', text: 'Disabled Item', isEnabled: false }
]);

const fields = {
  id: 'id',
  text: 'text',
  enabled: 'isEnabled'
};
</script>
```

### Toggle Item State Dynamically

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { id: '1', text: 'Item 1', isEnabled: true }
]);

const toggleItem = (id) => {
  const item = items.value.find(i => i.id === id);
  if (item) item.isEnabled = !item.isEnabled;
};
</script>
```

### CSS for Disabled Items

```vue
<style>
.e-list-item[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
```

## Best Practices

1. **Group meaningfully**: Use categories that make sense to users

2. **Limit nesting depth**: 2-3 levels max for usability

3. **Show selection state clearly**: Use checkmarks, highlight, or badges

4. **Lazy load images**: For lists with many image items

5. **Use CSS animations sparingly**: Heavy animations hurt performance

6. **Test with many items**: Verify performance with realistic data volumes

7. **Provide filtering for large groups**: Allow users to narrow down results

**Next:** Learn about [layout and alignment patterns](listview-layout-alignment-patterns.md) for common UIs.
