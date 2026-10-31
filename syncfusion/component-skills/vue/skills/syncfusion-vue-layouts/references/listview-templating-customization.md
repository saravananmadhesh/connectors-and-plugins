# ListView Templating & Customization (Vue 3)

## Table of Contents
- [Custom Item Templates](#custom-item-templates)
- [Header Templates](#header-templates)
- [Group Header Templates](#group-header-templates)
- [Template Data Context](#template-data-context)
- [Dynamic Templates](#dynamic-templates)
- [CSS Customization](#css-customization)
- [RTL Template Support](#rtl-template-support)

## Custom Item Templates

### String Template

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :template="templateString"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', text: 'Apple', category: 'Fruit' },
  { id: '2', text: 'Carrot', category: 'Vegetable' }
]);

const fields = { id: 'id', text: 'text' };

const templateString = `
  <div class="custom-item">
    <span class="item-text">\${text}</span>
    <span class="item-category">\${category}</span>
  </div>
`;
</script>
```

### Function Template

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :template="templateFn"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: '1', name: 'Project A', status: 'active' },
  { id: '2', name: 'Project B', status: 'pending' }
]);

const fields = { id: 'id', text: 'name' };

const templateFn = (data) => {
  const div = document.createElement('div');
  div.className = 'project-item';
  div.innerHTML = `
    <div class="project-name">${data.name}</div>
    <span class="status-badge status-${data.status}">${data.status}</span>
  `;
  return div;
};
</script>
```

## Header Templates

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :headerTemplate="headerTemplate"
    :showHeader="true"
  />
</template>

<script setup>
const headerTemplate = `
  <div class="list-header">
    <h3>My Items</h3>
    <span class="count-badge">\${count} items</span>
  </div>
`;
</script>
```

## Group Header Templates

```vue
<template>
  <ListViewComponent
    :dataSource="groupedData"
    :fields="fields"
    :groupTemplate="groupTemplate"
  />
</template>

<script setup>
import { ref } from 'vue';

const groupedData = ref([
  {
    category: 'Fruits',
    items: [
      { id: '1', text: 'Apple' },
      { id: '2', text: 'Banana' }
    ]
  },
  {
    category: 'Vegetables',
    items: [
      { id: '3', text: 'Carrot' }
    ]
  }
]);

const fields = {
  groupBy: 'category',
  id: 'id',
  text: 'text',
  child: 'items'
};

const groupTemplate = (data) => {
  const div = document.createElement('div');
  div.className = 'group-header';
  div.innerHTML = `<strong>${data.category}</strong> (${data.items.length})`;
  return div;
};
</script>
```

## Template Data Context

Templates receive the data object as the context. Available properties:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Item text (from fields.text) |
| `id` | string | Item ID (from fields.id) |
| `index` | number | Item index in list |
| All custom fields | various | From the data source object |

```vue
<script setup>
const template = (data) => {
  // data.text - mapped text field
  // data.id - mapped id field
  // data.category - custom field from data source
  // data.index - position in list
  return `<div>${data.text} - ${data.category}</div>`;
};
</script>
```

## Dynamic Templates

### Template Based on Item Type

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :template="getTemplate"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: '1', type: 'image', text: 'Photo', url: 'photo.jpg' },
  { id: '2', type: 'text', text: 'Note', body: 'A long note...' }
]);

const fields = { id: 'id', text: 'text' };

const getTemplate = (data) => {
  if (data.type === 'image') {
    return `<div class="image-item"><img src="${data.url}" alt="${data.text}" /></div>`;
  }
  return `<div class="text-item"><strong>${data.text}</strong><p>${data.body}</p></div>`;
};
</script>
```

### Device-Aware Templates

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth < 768);

const updateDevice = () => { isMobile.value = window.innerWidth < 768; };
onMounted(() => {
  updateDevice();
  window.addEventListener('resize', updateDevice);
});
onUnmounted(() => window.removeEventListener('resize', updateDevice));

const getTemplate = (data) => {
  if (isMobile.value) {
    return `<div class="compact">${data.text}</div>`;
  }
  return `<div class="detailed">
    <h4>${data.text}</h4>
    <p>${data.description}</p>
  </div>`;
};
</script>
```

## CSS Customization

### Basic Item Styling

```vue
<style>
.e-list-item .custom-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.e-list-item .item-text {
  font-weight: 500;
  color: #333;
}

.e-list-item .item-category {
  font-size: 12px;
  color: #999;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 10px;
}
</style>
```

### State-Based Styling

```vue
<style>
.e-list-item.selected {
  background: #e3f2fd;
  border-left: 3px solid #1976d2;
}

.e-list-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.e-list-item:hover {
  background: #f5f5f5;
}
</style>
```

### Per-Item Classes

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    cssClass="custom-list"
  />
</template>

<style>
.custom-list .e-list-item.priority-high {
  border-left: 3px solid #f44336;
}
.custom-list .e-list-item.priority-low {
  border-left: 3px solid #4caf50;
}
</style>
```

## RTL Template Support

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :enableRtl="true"
  />
</template>

<script setup>
const rtlTemplate = (data) => {
  return `<div class="rtl-item" style="text-align: right; direction: rtl;">${data.text}</div>`;
};
</script>
```

### CSS for RTL

```vue
<style>
[dir="rtl"] .e-list-item {
  text-align: right;
  padding-right: 16px;
  padding-left: 8px;
}

[dir="rtl"] .item-icon {
  margin-left: 8px;
  margin-right: 0;
}
</style>
```

## Best Practices

1. **Escape user content**: Prevent XSS by sanitizing template data

2. **Keep templates simple**: Complex templates hurt performance

3. **Use scoped styles**: Avoid global CSS conflicts

4. **Test on multiple devices**: Ensure templates work on mobile and desktop

5. **Cache template functions**: Don't recreate on every render

6. **Use CSS variables**: For themeable templates

7. **Consider accessibility**: Add proper ARIA attributes in templates

**Next:** Learn about [advanced features](listview-advanced-features.md) for grouping and sorting.
