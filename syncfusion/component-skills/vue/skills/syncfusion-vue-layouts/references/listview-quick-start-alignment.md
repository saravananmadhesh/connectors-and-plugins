# ListView Quick Start Alignment (Vue 3)

## Table of Contents
- [Fast Setup for Common Patterns](#fast-setup-for-common-patterns)
- [Common Container Setups](#common-container-setups)
- [Padding and Margin Guidelines](#padding-and-margin-guidelines)

## Fast Setup for Common Patterns

### Simple Scrollable List

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    height="300px"
    width="100%"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' }
]);

const fields = { id: 'id', text: 'text' };
</script>
```

### ListView in Card

```vue
<template>
  <div class="e-card list-card">
    <div class="e-card-header-title">My List</div>
    <div class="e-card-separator"></div>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      height="100%"
      width="100%"
    />
  </div>
</template>

<style scoped>
.list-card {
  height: 400px;
  display: flex;
  flex-direction: column;
}
.list-card .e-list-view {
  flex: 1;
  min-height: 0;
}
</style>
```

### ListView with Header

```vue
<template>
  <div class="list-with-header">
    <div class="list-header">Recent Items</div>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      height="calc(100% - 50px)"
    />
  </div>
</template>

<style scoped>
.list-with-header {
  height: 400px;
  display: flex;
  flex-direction: column;
}
.list-header {
  height: 50px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
```

### Horizontal ListView

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    cssClass="horizontal-list"
  />
</template>

<style>
.horizontal-list .e-list-parent {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
.horizontal-list .e-list-item {
  flex: 0 0 200px;
  margin-right: 8px;
}
</style>
```

## Common Container Setups

### Full Viewport List

```vue
<template>
  <div class="fullscreen-list">
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
    />
  </div>
</template>

<style scoped>
.fullscreen-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
.fullscreen-list .e-list-view {
  width: 100%;
  height: 100%;
}
</style>
```

### Sidebar Layout

```vue
<template>
  <div class="sidebar-layout">
    <aside class="sidebar">
      <ListViewComponent
        :dataSource="items"
        :fields="fields"
      />
    </aside>
    <main class="content">
      <!-- Main content -->
    </main>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 280px;
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
```

### Two-Column Grid with ListView

```vue
<template>
  <div class="two-col-grid">
    <div class="col">
      <ListViewComponent :dataSource="leftItems" :fields="fields" />
    </div>
    <div class="col">
      <ListViewComponent :dataSource="rightItems" :fields="fields" />
    </div>
  </div>
</template>

<style scoped>
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}
.col {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
```

## Padding and Margin Guidelines

### Standard Padding

```vue
<style>
/* Standard item padding */
.e-list-item {
  padding: 12px 16px;
}

/* Compact item padding */
.e-list-item.compact {
  padding: 6px 12px;
}

/* Comfortable item padding */
.e-list-item.comfortable {
  padding: 16px 20px;
}
</style>
```

### Container Padding

```vue
<style>
/* Outer container */
.list-container {
  padding: 16px;
}

/* Inner container - no padding */
.list-container.tight {
  padding: 0;
}
</style>
```

### Gap Between Items

```vue
<style>
.e-list-parent {
  display: flex;
  flex-direction: column;
  gap: 0; /* Default: items touch each other */
}

.e-list-parent.spaced {
  gap: 4px; /* Small gap between items */
}

.e-list-item {
  margin: 0; /* Avoid default margins */
  border-radius: 4px; /* Optional: rounded items with gap */
}
</style>
```

### Avoiding Common Pitfalls

```vue
<style>
/* DON'T: Use default margins */
.e-list-item {
  /* margin: 10px 0;  ❌ Causes misalignment */
}

/* DO: Use padding instead */
.e-list-item {
  padding: 12px 16px;  ✅ Internal padding maintains alignment */
}

/* DON'T: Mix padding and margin */
.e-list-item {
  padding: 10px;
  margin: 5px;  ❌ Inconsistent spacing */
}
</style>
```

## Quick Reference

| Pattern | Required CSS |
|---------|--------------|
| Scrollable list | `height: <value>`, `overflow: auto` |
| In flex container | `flex: 1; min-height: 0;` |
| In grid cell | `height: 100%; width: 100%;` |
| Full width | `width: 100%` on component |
| Fixed height | Explicit `height` value |

**Next:** Learn about [performance and virtualization](listview-performance-virtualization.md) for large lists.
