# Customization and Styling Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Built-in Themes](#built-in-themes)
3. [CSS Classes and Structure](#css-classes-and-structure)
4. [Custom Styling with :deep()](#custom-styling-with-deep)
5. [Level-Based Styling](#level-based-styling)
6. [Node-Type Styling](#node-type-styling)
7. [State-Based Styling](#state-based-styling)
8. [Full Row Styling](#full-row-styling)
9. [Dark Mode Support](#dark-mode-support)
10. [Icon Customization](#icon-customization)
11. [Troubleshooting](#troubleshooting)

## Overview

Vue 3 TreeView offers extensive customization through CSS classes, inline styles, and Vue 3's `:deep()` selector for scoped style modifications.

## Built-in Themes

### Available Themes

```vue
<script setup>
import { ref } from 'vue';

const themes = [
  'material',        // Material Design theme
  'bootstrap5',      // Bootstrap 5 theme
  'bootstrap4',      // Bootstrap 4 theme
  'fluent',          // Microsoft Fluent theme
  'tailwind',        // Tailwind CSS theme
  'highcontrast',    // High contrast theme
];

// Current theme
const currentTheme = ref('material');
</script>

<template>
  <div :class="`e-${currentTheme}`">
    <!-- TreeView content -->
  </div>
</template>
```

### Import Theme CSS

```vue
<script setup>
// Material theme
import '@syncfusion/ej2-vue-navigations/styles/material.css';

// Bootstrap 5 theme
// import '@syncfusion/ej2-vue-navigations/styles/bootstrap5.css';

// Fluent theme
// import '@syncfusion/ej2-vue-navigations/styles/fluent.css';

// Tailwind theme
// import '@syncfusion/ej2-vue-navigations/styles/tailwind.css';
</script>
```

### Theme Switching

```vue
<script setup>
import { ref } from 'vue';

const currentTheme = ref('material');
const availableThemes = ['material', 'bootstrap5', 'fluent', 'tailwind'];

const switchTheme = (theme) => {
  currentTheme.value = theme;
};

const dynamicThemeClass = () => {
  return `e-${currentTheme.value}`;
};
</script>

<template>
  <div>
    <div class="theme-selector">
      <button 
        v-for="theme in availableThemes"
        :key="theme"
        :class="{ active: currentTheme === theme }"
        @click="switchTheme(theme)"
      >
        {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
      </button>
    </div>

    <div :class="dynamicThemeClass()">
      <ejs-treeview
        :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      />
    </div>
  </div>
</template>

<style scoped>
.theme-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.theme-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.theme-selector button.active {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}
</style>
```

## CSS Classes and Structure

### TreeView DOM Structure

```html
<div class="e-treeview">                          <!-- TreeView container -->
  <ul class="e-treeview" role="tree">
    <li class="e-list-item">                      <!-- Individual node -->
      <div class="e-field">
        <span class="e-expand-icon"></span>       <!-- Expand/collapse icon -->
        <span class="e-list-text">Node Text</span> <!-- Node text -->
      </div>
      <ul class="e-list">                         <!-- Child nodes -->
        <li class="e-list-item">
          <!-- ... -->
        </li>
      </ul>
    </li>
  </ul>
</div>
```

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.e-treeview` | Main container |
| `.e-list-item` | Individual node |
| `.e-list-text` | Node text |
| `.e-expand-icon` | Expand/collapse icon |
| `.e-icons` | Icon elements |
| `.e-text-content` | Content wrapper |
| `.e-selected` | Selected node |
| `.e-hover` | Hovered node |
| `.e-check` | Checked node |
| `.e-full-row` | Full row selection |

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  />
</template>

<style scoped>
/* Customize node appearance */
:deep(.e-treeview .e-list-item) {
  padding: 8px 4px;
}

:deep(.e-treeview .e-list-text) {
  font-size: 14px;
  font-weight: 500;
}

/* Customize expand icon */
:deep(.e-treeview .e-expand-icon) {
  width: 24px;
  height: 24px;
}

/* Customize selected state */
:deep(.e-treeview .e-list-item.e-selected) {
  background-color: #e3f2fd;
  border-left: 3px solid #2196f3;
}

/* Customize hover state */
:deep(.e-treeview .e-list-item:hover) {
  background-color: #f5f5f5;
}
</style>
```

## Custom Styling with :deep()

### Modify TreeView Appearance

```vue
<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  />
</template>

<style scoped>
/* Main container */
:deep(.e-treeview) {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fafafa;
}

/* List items */
:deep(.e-treeview .e-list-item) {
  min-height: 32px;
  padding: 6px 4px;
  transition: background-color 0.2s ease;
}

/* Text content */
:deep(.e-treeview .e-list-text) {
  color: #333;
  font-size: 14px;
}

/* Expand/collapse icons */
:deep(.e-treeview .e-expand-icon::before) {
  color: #666;
  font-size: 16px;
}

/* Selected nodes */
:deep(.e-treeview .e-list-item.e-selected) {
  background-color: #bbdefb;
  border-left: 3px solid #1976d2;
  padding-left: 1px;
}

/* Hover effect */
:deep(.e-treeview .e-list-item:hover) {
  background-color: #f0f0f0;
  border-radius: 2px;
}

/* Focus indicator */
:deep(.e-treeview .e-list-item:focus) {
  outline: 2px solid #1976d2;
  outline-offset: -2px;
}
</style>
```

## Level-Based Styling

### Different Styles for Different Depths

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Level 1', level: 1 },
  { id: '02', name: 'Level 2', level: 2, parentID: '01' },
  { id: '03', name: 'Level 3', level: 3, parentID: '02' }
]);

const getLevelClass = (level) => {
  return `level-${level}`;
};
</script>

<template>
  <div>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    >
      <template v-slot:nodeTemplate="{ data: node }">
        <div :class="getLevelClass(node.level)">
          {{ node.name }}
        </div>
      </template>
    </ejs-treeview>
  </div>
</template>

<style scoped>
.level-1 {
  font-weight: bold;
  color: #1976d2;
  font-size: 16px;
}

.level-2 {
  font-weight: 600;
  color: #555;
  font-size: 14px;
  margin-left: 12px;
}

.level-3 {
  color: #888;
  font-size: 12px;
  margin-left: 24px;
  font-style: italic;
}

/* CSS approach using :nth-child */
:deep(.e-treeview .e-list-item:nth-level(1)) {
  background-color: #e3f2fd;
}

:deep(.e-treeview .e-list-item:nth-level(2)) {
  background-color: #f3e5f5;
}

:deep(.e-treeview .e-list-item:nth-level(3)) {
  background-color: #fce4ec;
}
</style>
```

## Node-Type Styling

### Style Nodes Based on Type

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Documents', type: 'folder' },
  { id: '02', name: 'Report.pdf', type: 'pdf', parentID: '01' },
  { id: '03', name: 'Image.jpg', type: 'image', parentID: '01' },
  { id: '04', name: 'Script.js', type: 'code', parentID: '01' }
]);

const getTypeClass = (type) => {
  return `type-${type}`;
};

const getTypeIcon = (type) => {
  const icons = {
    folder: 'e-icons e-folder',
    pdf: 'e-icons e-document',
    image: 'e-icons e-picture',
    code: 'e-icons e-code'
  };
  return icons[type] || 'e-icons e-file';
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div :class="getTypeClass(node.type)">
        <i :class="getTypeIcon(node.type)"></i>
        {{ node.name }}
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.type-folder {
  color: #f57c00;
  font-weight: 600;
}

.type-pdf {
  color: #d32f2f;
}

.type-image {
  color: #388e3c;
}

.type-code {
  color: #1976d2;
  font-family: 'Courier New', monospace;
}

.type-folder i::before {
  margin-right: 8px;
}

.type-pdf i::before {
  margin-right: 6px;
  color: #d32f2f;
}

.type-image i::before {
  margin-right: 6px;
  color: #388e3c;
}

.type-code i::before {
  margin-right: 6px;
  color: #1976d2;
}
</style>
```

## State-Based Styling

### Style Nodes Based on State

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Active Task', status: 'active' },
  { id: '02', name: 'Completed Task', status: 'completed', parentID: '01' },
  { id: '03', name: 'On Hold', status: 'hold', parentID: '01' },
  { id: '04', name: 'Failed Task', status: 'failed', parentID: '01' }
]);

const getStatusClass = (status) => {
  return `status-${status}`;
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div :class="getStatusClass(node.status)">
        <span class="status-indicator"></span>
        {{ node.name }}
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.status-active {
  display: flex;
  align-items: center;
  color: #4caf50;
  font-weight: 600;
}

.status-completed {
  display: flex;
  align-items: center;
  color: #4caf50;
  text-decoration: line-through;
  opacity: 0.7;
}

.status-hold {
  display: flex;
  align-items: center;
  color: #ff9800;
  font-weight: 500;
}

.status-failed {
  display: flex;
  align-items: center;
  color: #f44336;
  font-weight: 600;
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-active .status-indicator {
  background-color: #4caf50;
}

.status-completed .status-indicator {
  background-color: #4caf50;
}

.status-hold .status-indicator {
  background-color: #ff9800;
}

.status-failed .status-indicator {
  background-color: #f44336;
}
</style>
```

## Full Row Styling

### Highlight Entire Row

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    fullRowSelect="true"
  />
</template>

<style scoped>
/* Full row selection styling */
:deep(.e-treeview .e-full-row-wrap) {
  padding: 6px 0;
  margin: 2px 0;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

:deep(.e-treeview .e-full-row-wrap.e-selected) {
  background-color: #bbdefb;
  border-left: 3px solid #1976d2;
}

:deep(.e-treeview .e-full-row-wrap:hover) {
  background-color: #f0f0f0;
}

/* Extend selection to include full row */
:deep(.e-treeview .e-list-item.e-selected) {
  background-color: transparent;
  border-left: none;
}

:deep(.e-treeview .e-list-item.e-selected .e-full-row-wrap) {
  background-color: #bbdefb;
  border-left: 3px solid #1976d2;
  padding-left: calc(12px - 3px);
}
</style>
```

## Dark Mode Support

### Implement Dark Mode Theme

```vue
<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <button @click="toggleDarkMode">
      {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>

    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.dark-mode {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.dark-mode :deep(.e-treeview) {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.dark-mode :deep(.e-treeview .e-list-text) {
  color: #e0e0e0;
}

.dark-mode :deep(.e-treeview .e-list-item:hover) {
  background-color: #3a3a3a;
}

.dark-mode :deep(.e-treeview .e-list-item.e-selected) {
  background-color: #1565c0;
}

.dark-mode :deep(.e-expand-icon::before) {
  color: #b0bec5;
}

/* Using CSS media query for system preference */
@media (prefers-color-scheme: dark) {
  :deep(.e-treeview) {
    background-color: #2d2d2d;
    color: #e0e0e0;
  }

  :deep(.e-treeview .e-list-text) {
    color: #e0e0e0;
  }
}
</style>
```

## Icon Customization

### Custom Icons

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Documents', icon: '📁', type: 'folder' },
  { id: '02', name: 'PDF File', icon: '📄', type: 'file', parentID: '01' },
  { id: '03', name: 'Image', icon: '🖼️', type: 'image', parentID: '01' },
  { id: '04', name: 'Code', icon: '💻', type: 'code', parentID: '01' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="node-with-icon">
        <span class="icon">{{ node.icon }}</span>
        <span class="name">{{ node.name }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.node-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.name {
  flex: 1;
}
</style>
```

### Font Icon Classes

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Home', iconClass: 'e-icons e-home' },
  { id: '02', name: 'Settings', iconClass: 'e-icons e-setting' },
  { id: '03', name: 'Profile', iconClass: 'e-icons e-profile' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div class="node-with-icon">
        <i :class="node.iconClass"></i>
        <span>{{ node.name }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.node-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.node-with-icon i::before {
  color: #1976d2;
  font-size: 16px;
}
</style>
```

## Troubleshooting

### Issue: Scoped styles not applying to TreeView

**Solution:** Use `:deep()` selector to pierce component scope

```vue
<style scoped>
/* ✗ Won't work - scoped styles don't pierce component boundary */
.e-treeview .e-list-item {
  color: red;
}

/* ✓ Correct - :deep() pierces scope */
:deep(.e-treeview .e-list-item) {
  color: red;
}
</style>
```

### Issue: Custom icons not showing

**Solution:** Ensure icon fonts are imported

```vue
<script setup>
import '@syncfusion/ej2-icons/styles/material.css';
</script>
```

### Issue: Dark mode styles conflicting

**Solution:** Use CSS variable approach

```vue
<style scoped>
:root {
  --bg-color: white;
  --text-color: black;
}

.dark-mode {
  --bg-color: #1e1e1e;
  --text-color: #e0e0e0;
}

:deep(.e-treeview) {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
```

---

**Key Takeaways:**
- ✅ Use `:deep()` for scoped component styling
- ✅ Leverage built-in themes for quick styling
- ✅ Implement level-based and type-based styling via templates
- ✅ Support dark mode with CSS media queries or class toggle
- ✅ Use custom icons for better UX
- ✅ Apply consistent focus and hover states
- ✅ Test styling across different themes
- ✅ Use CSS variables for maintainable theme support
